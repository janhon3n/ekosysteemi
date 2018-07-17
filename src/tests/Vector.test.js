import Vector from '../Vector'

describe('Vector', () => {

  it('limitAbs works with all inputs', () => {
    expect(() => Vector.zero.limitAbs(1)).not.toThrow()
    expect(() => new Vector(1000, 1000).limitAbs(10000)).not.toThrow()
    expect(new Vector(100, 0).limitAbs(20).x).toBeCloseTo(20)
    expect(new Vector(0, 100).limitAbs(20).y).toBeCloseTo(20)
    expect(new Vector(30, 40).limitAbs(5).y).toBeCloseTo(4)
    expect(new Vector(-30, -40).limitAbs(5).y).toBeCloseTo(-4)
    expect(new Vector(30, -40).limitAbs(5).y).toBeCloseTo(-4)
    expect(new Vector(30, -40).limitAbs(5).x).toBeCloseTo(3)
    expect(new Vector(-30, 40).limitAbs(5).y).toBeCloseTo(4)
    expect(new Vector(-30, 40).limitAbs(5).x).toBeCloseTo(-3)
  })
})