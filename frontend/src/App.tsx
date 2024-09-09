import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

interface Game {
  week: number;
  date: string;
  time: string;
  opponent: string;
  isHome: boolean;
}

const teamLogos: { [key: string]: string } = {
  "Arizona Cardinals": "https://static.www.nfl.com/image/private/f_auto/league/u9fltoslqdsyao8cpm0k",
  "Atlanta Falcons": "https://static.www.nfl.com/image/private/f_auto/league/d8m7hzpsbrl6pnqht8op",
  "Baltimore Ravens": "https://static.www.nfl.com/image/private/f_auto/league/ucsdijmddsqcj1i9tddd",
  "Buffalo Bills": "https://static.www.nfl.com/image/private/f_auto/league/giphcy6ie9mxbnldntsf",
  "Carolina Panthers": "https://static.www.nfl.com/image/private/f_auto/league/ervfzgrqdpnc7lh5gqwq",
  "Chicago Bears": "https://static.www.nfl.com/image/private/f_auto/league/ra0poq2ivwyahbaq86d2",
  "Cincinnati Bengals": "https://static.www.nfl.com/image/private/f_auto/league/okxpteoliyayufypqalq",
  "Cleveland Browns": "https://static.www.nfl.com/image/private/f_auto/league/fgbn8acp4opvyxk13dcy",
  "Dallas Cowboys": "https://static.www.nfl.com/image/private/f_auto/league/ieid8hoygzdlmzo0tnf6",
  "Denver Broncos": "https://static.www.nfl.com/image/private/f_auto/league/t0p7m5cjdjy18rnzzqbx",
  "Detroit Lions": "https://static.www.nfl.com/image/private/f_auto/league/ocvxwnapdvwevupe4tpr",
  "Green Bay Packers": "https://static.www.nfl.com/image/private/f_auto/league/gppfvr7n8gljgjaqux2x",
  "Houston Texans": "https://static.www.nfl.com/image/private/f_auto/league/bpx88i8nw4nnabuq0oob",
  "Indianapolis Colts": "https://static.www.nfl.com/image/private/f_auto/league/ketwqeuschqzjsllbid5",
  "Jacksonville Jaguars": "https://static.www.nfl.com/image/private/f_auto/league/qycbib6ivrm9dqaexryk",
  "Kansas City Chiefs": "https://static.www.nfl.com/image/private/f_auto/league/ujshjqvmnxce8m4obmvs",
  "Las Vegas Raiders": "https://static.www.nfl.com/image/private/f_auto/league/gzcojbzcyjgubgyb6xf2",
  "Los Angeles Chargers": "https://static.www.nfl.com/image/private/f_auto/league/ayvwcmluj2ohkdlbiegi",
  "Los Angeles Rams": "https://static.www.nfl.com/image/private/f_auto/league/ayvwcmluj2ohkdlbiegi",
  "Miami Dolphins": "https://static.www.nfl.com/image/private/f_auto/league/lits6p8ycthy9to70bnt",
  "Minnesota Vikings": "https://static.www.nfl.com/image/private/f_auto/league/teguylrnqqmfcwxvcmmz",
  "New England Patriots": "https://static.www.nfl.com/image/private/f_auto/league/moyfxx3dq5pio4aiftnc",
  "New Orleans Saints": "https://static.www.nfl.com/image/private/f_auto/league/grhjkahghjkk17v43hdx",
  "New York Giants": "https://static.www.nfl.com/image/private/f_auto/league/t6mhdmgizi6qhndh8b9p",
  "New York Jets": "https://static.www.nfl.com/image/private/f_auto/league/ekijosiae96gektbo4iw",
  "Philadelphia Eagles": "https://static.www.nfl.com/image/private/f_auto/league/puhrqgj71gobgdkdo6uq",
  "Pittsburgh Steelers": "https://static.www.nfl.com/image/private/f_auto/league/xujg9t3t4u5nmjgr54wx",
  "San Francisco 49ers": "https://static.www.nfl.com/image/private/f_auto/league/dxibuyxbk0b9ua5ih9hn",
  "Seattle Seahawks": "https://static.www.nfl.com/image/private/f_auto/league/gcytzwpjdzbpwnwxincg",
  "Tampa Bay Buccaneers": "https://static.www.nfl.com/image/private/f_auto/league/v8uqiualryypwqgvwcih",
  "Tennessee Titans": "https://static.www.nfl.com/image/private/f_auto/league/pln44vuzugjgipyidsre",
  "Washington Commanders": "https://static.www.nfl.com/image/private/f_auto/league/xymxwrxtyj9fhaemhdyd"
};

const App: React.FC = () => {
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [schedule, setSchedule] = useState<Game[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await backend.getTeams();
      setTeams(fetchedTeams);
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (selectedTeam) {
        const fetchedSchedule = await backend.getSchedule(selectedTeam);
        if (fetchedSchedule) {
          setSchedule(fetchedSchedule);
        }
      }
    };
    fetchSchedule();
  }, [selectedTeam]);

  const formatDisplayDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container">
      <h1>NFL Team Schedule - 2024 Season</h1>
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
      <div id="schedule">
        {schedule.map((game) => (
          <div key={game.week} className="game-week">
            <div className="week-header">
              Week {game.week} - {formatDisplayDate(game.date)}
            </div>
            {game.opponent === "BYE" ? (
              <div className="game">BYE WEEK</div>
            ) : (
              <div className="game">
                <div className="team">
                  <div
                    className="team-logo"
                    style={{ backgroundImage: `url('${teamLogos[game.isHome ? selectedTeam : game.opponent]}')` }}
                  ></div>
                  <div className="team-name">{game.isHome ? selectedTeam : game.opponent}</div>
                </div>
                <div className="game-info">
                  <div>{game.time}</div>
                  <div>vs</div>
                </div>
                <div className="team">
                  <div
                    className="team-logo"
                    style={{ backgroundImage: `url('${teamLogos[game.isHome ? game.opponent : selectedTeam]}')` }}
                  ></div>
                  <div className="team-name">{game.isHome ? game.opponent : selectedTeam}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;