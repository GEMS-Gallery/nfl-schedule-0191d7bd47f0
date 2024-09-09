import Array "mo:base/Array";
import Text "mo:base/Text";

actor NFLSchedule {
  type Team = Text;

  let teams : [Team] = [
    "ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX", "KC",
    "LA", "LAC", "LV", "MIA", "MIN", "NE", "NO", "NYG", "NYJ", "PHI", "PIT", "SEA", "SF", "TB", "TEN", "WAS"
  ];

  public query func getTeams() : async [Team] {
    teams
  };
}