import { asRadians, asDegrees } from "./utils";

export class FlowerGraphData {
  #r: number[];
  #theta: number[];

  constructor(r: number[], theta: number[], isDegrees: boolean) {
    if (r.length != theta.length) {
      throw new Error(`The number of radial data points ${r.length} does not match the number of angular data points ${theta.length}.`)
    }

    // Angle data always stored in radians
    this.#theta = isDegrees ? theta.map(asRadians) : theta;
    console.log(this.#theta);
    this.#r = r;
  }

  public r(): number[] {
    return this.#r;
  }

  public setR(r: number[]) {
    this.#r = r;
  }

  public theta(inDegrees: boolean): number[] {
    return inDegrees ? this.#theta.map(asDegrees) : this.#theta;
  }

  public setTheta(theta: number[], isDegrees: boolean) {
    this.#theta = isDegrees ? theta.map(asRadians) : theta;
  }

  public data(): [number, number][] {
    return this.#r.map((v, i) => [this.#theta[i], v]);
  }
}

export interface FlowerGraphProps {
  height?: number,
  width?: number,
  r: number[],
  theta: number[],
  isDegrees: boolean,
  numRadialTicks?: number,
  numAngularTicks?: number
}
