export const idlFactory = ({ IDL }) => {
  const Team = IDL.Text;
  const Date = IDL.Text;
  const Game = IDL.Record({
    'date' : Date,
    'time' : IDL.Text,
    'week' : IDL.Nat,
    'isHome' : IDL.Bool,
    'opponent' : Team,
  });
  return IDL.Service({
    'generateSchedules' : IDL.Func([], [], []),
    'getSchedule' : IDL.Func([Team], [IDL.Opt(IDL.Vec(Game))], ['query']),
    'getTeams' : IDL.Func([], [IDL.Vec(Team)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
