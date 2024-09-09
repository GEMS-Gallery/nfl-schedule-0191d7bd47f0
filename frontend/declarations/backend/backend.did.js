export const idlFactory = ({ IDL }) => {
  const Team = IDL.Text;
  return IDL.Service({ 'getTeams' : IDL.Func([], [IDL.Vec(Team)], ['query']) });
};
export const init = ({ IDL }) => { return []; };
