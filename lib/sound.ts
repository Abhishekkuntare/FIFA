"use client"

// Lightweight procedural sound engine using the Web Audio API.
// No external assets: crowd ambience, whistles, kicks and UI blips are synthesized.

class SoundEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private crowdGain: GainNode | null = null
  private crowdSource: AudioBufferSourceNode | null = null
  private _muted = true
  private _ambient = false

  get muted() {
    return this._muted
  }

  private ensure() {
    if (this.ctx) return this.ctx
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0.0
    this.master.connect(this.ctx.destination)
    return this.ctx
  }

  async unlock() {
    const ctx = this.ensure()
    if (ctx.state === "suspended") await ctx.resume()
  }

  setMuted(muted: boolean) {
    this._muted = muted
    const ctx = this.ensure()
    const target = muted ? 0.0 : 0.9
    this.master?.gain.cancelScheduledValues(ctx.currentTime)
    this.master?.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.4)
    if (!muted && !this._ambient) this.startCrowd()
  }

  toggleMute() {
    this.setMuted(!this._muted)
    return this._muted
  }

  // Filtered noise loop that mimics a distant crowd murmur with slow swells.
  private startCrowd() {
    const ctx = this.ensure()
    if (!this.master) return
    this._ambient = true
    const seconds = 4
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true

    const lp = ctx.createBiquadFilter()
    lp.type = "lowpass"
    lp.frequency.value = 760
    const hp = ctx.createBiquadFilter()
    hp.type = "highpass"
    hp.frequency.value = 180

    const g = ctx.createGain()
    g.gain.value = 0.16
    this.crowdGain = g

    // slow LFO swell on the crowd volume
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 0.06
    lfo.connect(lfoGain).connect(g.gain)
    lfo.start()

    src.connect(hp).connect(lp).connect(g).connect(this.master)
    src.start()
    this.crowdSource = src
  }

  // Quick crowd roar swell, e.g. on country select.
  roar() {
    if (this._muted) return
    const ctx = this.ensure()
    if (!this.crowdGain) return
    const now = ctx.currentTime
    this.crowdGain.gain.cancelScheduledValues(now)
    this.crowdGain.gain.setValueAtTime(this.crowdGain.gain.value, now)
    this.crowdGain.gain.linearRampToValueAtTime(0.42, now + 0.25)
    this.crowdGain.gain.linearRampToValueAtTime(0.16, now + 1.6)
  }

  // Short UI blip.
  blip(freq = 660) {
    if (this._muted) return
    const ctx = this.ensure()
    if (!this.master) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = "triangle"
    o.frequency.value = freq
    g.gain.value = 0.0001
    o.connect(g).connect(this.master)
    const now = ctx.currentTime
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
    o.start(now)
    o.stop(now + 0.18)
  }

  // Ball kick thud.
  kick() {
    if (this._muted) return
    const ctx = this.ensure()
    if (!this.master) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = "sine"
    const now = ctx.currentTime
    o.frequency.setValueAtTime(180, now)
    o.frequency.exponentialRampToValueAtTime(48, now + 0.18)
    g.gain.setValueAtTime(0.6, now)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
    o.connect(g).connect(this.master)
    o.start(now)
    o.stop(now + 0.24)
  }

  // Referee whistle.
  whistle() {
    if (this._muted) return
    const ctx = this.ensure()
    if (!this.master) return
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    o.type = "sawtooth"
    o.frequency.value = 2300
    lfo.frequency.value = 18
    lfoGain.gain.value = 60
    lfo.connect(lfoGain).connect(o.frequency)
    const now = ctx.currentTime
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.16, now + 0.03)
    g.gain.setValueAtTime(0.16, now + 0.3)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
    o.connect(g).connect(this.master)
    o.start(now)
    lfo.start(now)
    o.stop(now + 0.46)
    lfo.stop(now + 0.46)
  }
}

let engine: SoundEngine | null = null
export function getSound() {
  if (typeof window === "undefined") return null
  if (!engine) engine = new SoundEngine()
  return engine
}
