export function searchItemHelper(array, targetId) {
  return array?.find(i => +i.id === +targetId);
};
