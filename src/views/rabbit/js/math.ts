
export function rand_range(a:number, b:number):number {
  return Math.random() * (b - a) + a;
}

export function rand_normalish() :number{
  const r = Math.random() + Math.random() + Math.random() + Math.random();
  return (r / 4.0) * 2.0 - 1;
}

export function rand_int(a:number, b:number):number {
  return Math.round(Math.random() * (b - a) + a);
}

export function lerp(x:number, a:number, b:number):number {
  return x * (b - a) + a;
}

export function smoothstep(x:number, a:number, b:number) :number{
  x = x * x * (3.0 - 2.0 * x);
  return x * (b - a) + a;
}

export function smootherstep(x:number, a:number, b:number):number {
  x = x * x * x * (x * (x * 6 - 15) + 10);
  return x * (b - a) + a;
}

export function clamp(x:number, a:number, b:number) :number{
  return Math.min(Math.max(x, a), b);
}

export function sat(x:number):number {
  return Math.min(Math.max(x, 0.0), 1.0);
}

export function in_range(x:number, a:number, b:number) :boolean{
  return x >= a && x <= b;
}


