import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MsxProductPictureGrid from './MsxProductPictureGrid.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    width: 710,
    justify: 'center',
  },
  header: {
    justify: 'center',
    width: 500,
  },
  input: {
    width: '100%'
  },
  textField: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  slider: {
    padding: '22px 0px',
  },
});

function getSKUs() {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    skus: searchParams.getAll('skus') || ""
  };
}

function setSKUs(skus) {
  const searchParams = new URLSearchParams();
  searchParams.set("skus", skus || "");
  return searchParams.toString();
}

function getColumnsToShow() {
  const cookies = new Cookies();
  return {
    columns: cookies.get('columns') || 12
  };
}

function setColumnsToShow(columns) {
  const cookies = new Cookies();
  cookies.set('columns', columns, { path: '/' });
}

@withStyles(styles)
class DisplayOptions extends React.Component {
  state = {
    value: this.props.columns
  };

  handleChange = (event, value) => {
    this.setState({ value });
    setColumnsToShow(value);
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Slider
          classes={{ container: this.props.classes.slider }}
          value={this.state.value}
          min={4}
          max={12}
          step={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

@withStyles(styles)
class SkuInput extends React.Component {
  state = {
    inputValue: this.props.skus
  };
  updateInputValue = e => {
      this.setState({ inputValue: e.target.value });
  }
  updateURL = () => {
    const url = setSKUs(this.state.inputValue);
    this.props.history.push(`?${url}`);
  };
  resetURL = () => {
    this.state.inputValue = ''
    this.updateURL();
  };
  render() {
    return (
      <div className={this.props.classes.input}>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows="2"
          value={this.state.inputValue}
          onChange={this.updateInputValue}
          className={this.props.classes.textField}
          variant="outlined"
        />
        <div>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={this.props.classes.button}
            onClick={this.updateURL}>
            Show
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={this.props.classes.button}
            onClick={this.resetURL}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

const App = props => {

  return(
        <React.Fragment>
          <CssBaseline />
          <Router>
            <React.Fragment>
              <Route
                path="/"
                render={({ history }) => {
                  const { skus } = getSKUs();
                  const { columns } = getColumnsToShow();
                  return (
                    <div>
                      <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="h6">SKUs</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <SkuInput skus={skus} history={history} />
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                      <MsxProductPictureGrid skus={skus} columns={columns} />;
                      <BottomNavigation>
                        <DisplayOptions columns={columns} />
                      </BottomNavigation>
                    </div>
                  )
                }}
              />
            </React.Fragment>
          </Router>
        </React.Fragment>
      )
}

export default App;
