export class MockFactory<T> {
  private _mockGenerator: () => T

  constructor(mockGenerator: () => T) {
    this._mockGenerator = mockGenerator
  }

  public getMock(): T {
    return this._mockGenerator()
  }

  public getMockList(quantity: number): T[] {
    const mockList: T[] = []

    for (let i = 0; i < quantity; i++) {
      const mock = this._mockGenerator()
      mockList.push(mock)
    }

    return mockList
  }
}
