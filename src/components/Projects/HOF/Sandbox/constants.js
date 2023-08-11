export const integerColumns = [
  "MVP",
  "All_Star",
  "Total_Rebounds",
  "Total_Blocks",
  "Points_Per_Game_Award",
  "Win_Shares",
  "Championships",
];

export const columnRanges = {
  MVP: { minValue: 0, maxValue: 6 }, // Range: 0 to 1
  All_Star: { minValue: 0, maxValue: 18 }, // Range: 0 to 10
  Field_Goal_Percentage: { minValue: 0.2, maxValue: 0.6 }, // Range: 0.4 to 0.6
  Total_Rebounds: { minValue: 0, maxValue: 12000 }, // Range: 0 to 10,000
  Total_Blocks: { minValue: 0, maxValue: 5000 }, // Range: 0 to 5,000
  Points_Per_Game_Award: { minValue: 0, maxValue: 100 }, // Range: 0 to 40
  Win_Shares: { minValue: 0, maxValue: 100 }, // Range: 0 to 20
  Player_Efficiency_Rating: { minValue: 0, maxValue: 30 }, // Range: 0 to 30
  Offensive_Win_Shares: { minValue: 0, maxValue: 100 }, // Range: 0 to 10
  Defensive_Win_Shares: { minValue: 0, maxValue: 100 }, // Range: 0 to 10
  Championships: { minValue: 0, maxValue: 6 }, // Range: 0 to 1
};
