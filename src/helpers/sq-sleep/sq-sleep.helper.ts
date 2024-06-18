export async function SqSleep(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
