/**
 * Escape substitutes in text with %...% 
 */
export function format(text: string, subst: { [key: string]: string }): string {
  return text.replace(/__\w+__/g, all => {
    const real = all.slice(2, -2);
    return subst[real] || all;
  });
}