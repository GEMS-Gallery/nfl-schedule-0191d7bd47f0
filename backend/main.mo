import Bool "mo:base/Bool";
import Char "mo:base/Char";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";

actor NFLSchedule {
  type Team = Text;
  type Date = Text;
  type Game = {
    week: Nat;
    date: Date;
    time: Text;
    opponent: Team;
    isHome: Bool;
  };

  let teams : [Team] = [
    "Arizona Cardinals", "Atlanta Falcons", "Baltimore Ravens", "Buffalo Bills",
    "Carolina Panthers", "Chicago Bears", "Cincinnati Bengals", "Cleveland Browns",
    "Dallas Cowboys", "Denver Broncos", "Detroit Lions", "Green Bay Packers",
    "Houston Texans", "Indianapolis Colts", "Jacksonville Jaguars", "Kansas City Chiefs",
    "Las Vegas Raiders", "Los Angeles Chargers", "Los Angeles Rams", "Miami Dolphins",
    "Minnesota Vikings", "New England Patriots", "New Orleans Saints", "New York Giants",
    "New York Jets", "Philadelphia Eagles", "Pittsburgh Steelers", "San Francisco 49ers",
    "Seattle Seahawks", "Tampa Bay Buccaneers", "Tennessee Titans", "Washington Commanders"
  ];

  var schedules = HashMap.HashMap<Team, [Game]>(32, Text.equal, Text.hash);

  public func generateSchedules() : async () {
    let startDate = "2024-09-05";
    for (team in teams.vals()) {
      var teamSchedule : [Game] = [];
      var currentDate = startDate;

      for (week in Iter.range(1, 18)) {
        if (week == 10) {
          teamSchedule := Array.append(teamSchedule, [{
            week = week;
            date = currentDate;
            time = "";
            opponent = "BYE";
            isHome = false;
          }]);
        } else {
          var opponent = teams[0];
          while (opponent == team) {
            opponent := teams[Int.abs(Time.now()) % teams.size()];
          };
          let isHome = (Int.abs(Time.now()) % 2) == 0;
          let time = if (isHome) "13:00" else "16:25";

          teamSchedule := Array.append(teamSchedule, [{
            week = week;
            date = currentDate;
            time = time;
            opponent = opponent;
            isHome = isHome;
          }]);
        };
        currentDate := addDays(currentDate, 7);
      };
      schedules.put(team, teamSchedule);
    };
  };

  public query func getSchedule(team: Team) : async ?[Game] {
    schedules.get(team)
  };

  public query func getTeams() : async [Team] {
    teams
  };

  func addDays(date: Text, days: Nat) : Text {
    // This is a simplified version. In a real application, you'd want to use a proper date library
    // or implement a more robust date calculation function.
    date
  };
}