// config/engineers.config.ts

let engineersData = {
  engineers: ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona'] as string[],
  defaultTimes: [5, 10, 15, 20] as number[],
};

// Simulate saving (only persists in localStorage unless you have backend)
export const getEngineersConfig = () => {
  if (typeof localStorage === 'undefined') {
    // Fallback to default data if localStorage is not available
    return engineersData;
  }
  const saved = localStorage.getItem('engineersConfig');
  if (saved) {
    const parsed = JSON.parse(saved);
    return {
      engineers: parsed.engineers || engineersData.engineers,
      defaultTimes: engineersData.defaultTimes, // keep times fixed
    };
  }
  return engineersData;
};

export const saveEngineersConfig = (engineers: string[]) => {
  const newConfig = { engineers, defaultTimes: engineersData.defaultTimes };
  localStorage.setItem('engineersConfig', JSON.stringify(newConfig));
  // Also update in-memory for instant feedback
  engineersData = newConfig;
};