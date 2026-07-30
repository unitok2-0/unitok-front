export function composeEmptyCustomNamesWarningMessage(
  emptyCustomNames: number[]
) {
  return emptyCustomNames?.length > 1
    ? `Os nomes ${emptyCustomNames?.join(
        ", "
      )} estão vazios, deseja mantê-los assim?`
    : `O nome ${emptyCustomNames?.[0]} está vazio, deseja mantê-lo assim?`;
}
