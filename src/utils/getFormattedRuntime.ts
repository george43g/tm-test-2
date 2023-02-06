export const getFormattedRuntime = (time: number) => {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};
