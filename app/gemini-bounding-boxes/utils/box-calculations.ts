export interface Box2D {
  percentages: {
    left: number
    top: number
    width: number
    height: number
  }
}

export function calculateBox2D(coordinates: number[]): Box2D {
  const [x1, y1, x2, y2] = coordinates

  return {
    percentages: {
      top: x1 / 10,
      left: y1 / 10,
      width: (y2 - y1) / 10,
      height: (x2 - x1) / 10,
    },
  }
}