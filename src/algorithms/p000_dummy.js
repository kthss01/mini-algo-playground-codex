function solveDummy(input) {
  const items = Array.isArray(input?.items) ? input.items : [];
  const sum = items.reduce((acc, value) => acc + Number(value || 0), 0);

  return {
    sum,
    count: items.length,
  };
}

module.exports = {
  solveDummy,
};
