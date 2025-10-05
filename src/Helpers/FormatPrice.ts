
export function formatCurrency(num:number):string{
  return new Intl.NumberFormat("en-us",{
    style:"currency",
    currency:"EGP"
  }).format(num);
}
