export type MenuItem = {
  type: string;
  details: {
    name: string;
    calories: number;
    ingredients: string[];
    instructions: string;
  };
  icon?: string;
};
