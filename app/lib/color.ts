export const colors = [
  "bg-red-200 text-red-700",
  "bg-indigo-200 text-indigo-700",
  "bg-amber-200 text-amber-700",
  "bg-blue-200 text-blue-700",
  "bg-green-200 text-green-700",
  "bg-teal-200 text-teal-700",
  "bg-orange-200 text-orange-700",
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
