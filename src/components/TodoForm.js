
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import React ,{ useState }from 'react';


const useStyles = makeStyles( (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      
    },
  },
}));


function TodoForm(props) {
const [name, setName] = useState(props);


  function handleNameChange(params) {
      setName(params.target.value)
  }
  const classes = useStyles();

  return (
      <div>
      <form className={classes.root} noValidate autoComplete="off">
      
        <TextField id="outlined-basic" label="Insert Task" variant="outlined" />
        
        </form>
        

        <section>
            <p lable="Name">
                <TextField
                    value={name}
                    onChange={handleNameChange}
                />
            </p>
        </section>
    </div>
  );
}

export default TodoForm;

