export const colors = [
  "bg-red-200/90 text-red-700 border border-2 border-red-700",
  "bg-indigo-200/90 text-indigo-700 border border-2 border-indigo-700",
  "bg-amber-200/90 text-amber-700 border border-2 border-amber-700",
  "bg-blue-200/90 text-blue-700 border border-2 border-blue-700",
  "bg-green-200/90 text-green-700 border border-2 border-green-700",
  "bg-teal-200/90 text-teal-700 border border-2 border-teal-700",
  "bg-orange-200/90 text-orange-700 border border-2 border-orange-700",
];

export function getColor(topic?: string) {
  function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
  if (topic) {
    const hash = hashCode(topic);
    const index = hash % colors.length;
    return colors[Math.abs(index)];
  } else {
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
