import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Ctx } from './Store';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      backgroundColor: '#f0f5f4',
      margin: '10px',
      width: '200vh',
      height: '90vh'
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    flexBasis: '30%',
    height: '65vh',
    borderRight: '1px solid grey'
  },
  chatWindow: {
    height: '65vh',
    padding: '20px'
  },
  chatBox: {
    flexBasis: '90%',
    marginLeft: '10px',

    '& input': {
      color: 'blue'
    }
  },
  previousChat: {
    display: 'flex',
    padding: '10px',
    color: 'blue'
  },
  chip: {
    marginRight: '15px'
  },
  list: {
    '&:hover': {
      backgroundColor: '#213cd9'
    }
  },
  button: {
    marginLeft: '10px'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  // Contect Store
  const { allChats, sendChatAction, user } = useContext(Ctx);

  const topics = Object.keys(allChats);

  //local states
  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, changeTextValue] = useState('');
  return (
    <div className={classes.root}>
      <Paper variant='outlined'>
        <Typography variant='h4' component='h4'>
          Chat App
        </Typography>
        <Typography variant='h5' component='h5'>
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  className={classes.list}
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.previousChat} key={i}>
                <Chip label={chat.from} className={classes.chip} />
                <Typography variant='body1' className={classes.msg}>
                  {chat.msg}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label='Send Chat'
            type='text'
            className={classes.chatBox}
            value={textValue}
            variant='outlined'
            onKeyUp={e => {
              if (e.keyCode === 13) {
                sendChatAction({
                  from: user,
                  msg: textValue,
                  topic: activeTopic
                });
                changeTextValue('');
              }
            }}
            onChange={e => changeTextValue(e.target.value)}
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={() => {
              sendChatAction({
                from: user,
                msg: textValue,
                topic: activeTopic
              });
              changeTextValue('');
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
