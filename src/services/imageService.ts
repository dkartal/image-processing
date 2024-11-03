export const resizeImage = async (
  filename: string,
  width: number,
  height: number
) => {
  console.log(filename, width, height);
};

export const getImageName = (
  filename: string,
  width: number,
  height: number
) => {
  return `${filename}-${width}x${height}.jpg`;
};
