export function getData() {
    const numItems = 20 + Math.floor(20 * Math.random())
    const data = []
    for (let i = 0; i < numItems; i++) {
      data.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random(),
        color: i % 5,
      })
    }
    return data
  }