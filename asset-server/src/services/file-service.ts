const getFileExtension = (fileName: string) => {
  const extension = fileName.split('.').pop()!.toLowerCase();

  return extension ? `.${extension}` : '';
};

export { getFileExtension };
