async function execute<TResult>(
  request: () => Promise<TResult>,
  onSuccess: (apiResult: TResult) => void,
  onFailer?: (error?: any) => void
) {
  try {
    const result = await request();
    onSuccess(result);
  } catch (error) {
    onFailer?.(error);
  }
}

export default { execute };
