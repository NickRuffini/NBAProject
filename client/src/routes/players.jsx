import Grid from "@material-ui/core/Grid";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const teamOptions = ['Mil', 'Cha', 'Gsw'];

export default function Players() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Players</h2>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <label>Player Name: </label>
            <input type='text' name='playerName'/>
          </Grid>
          <Grid item xs={4}>
            <Dropdown options={teamOptions} value={teamOptions[0]} placeholder="Select an option" />
          </Grid>
          <Grid item xs={4}>
            <button>Add Player</button>
          </Grid>
        </Grid>
      </main>
    );
}