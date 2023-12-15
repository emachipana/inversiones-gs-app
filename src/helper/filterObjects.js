function filterObjects(values) {
  return Object.keys(values).reduce((result, key) => {
    const match = key.match(/(\d+)$/);

    if (match) {
      const num = match[1];
      if (!result[num]) {
        result[num] = {};
      }
      result[num][key] = values[key];
    }
    
    return result;
  }, []);
}

export default filterObjects;
