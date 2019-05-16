import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom'

const styles = theme => ({
  gridList: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridImage: {
    width: '100%',
    height: 'auto',
    paddingBottom: 20,
  },
  tileBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0) 100%)',
  },
  tileTitle: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  titleWrap: {
    padding: 0,
    margin: 0,
    marginLeft: 5,
  }
});


function MsxProductPictureGrid(props) {
  const { skus, columns, classes } = props;
  const cleanedSkuInput = skus.toString().trim();
  let tileData = [];

  if(cleanedSkuInput.length > 0) {
    tileData = cleanedSkuInput.split('\n').map(line => {
      const items = line.split('\t');
      const sku = parseInt(items[0],10);
      const name = items[2];
      return {
        img: 'https://d26hhearhq0yio.cloudfront.net/content/misterspex/produkte/grafiken/' + sku + '_a3.jpg',
        title: name,
        link: 'https://www.misterspex.de/brillen/_f' + sku + '.html',
      }
    });
  }

  return (
          <div className={classes.gridList}>
            <GridList cellHeight={'auto'} className={classes.gridList} cols={columns}>
              {tileData.map(tile => (
                <GridListTile key={tile.title} cols={1}>
                  <img src={tile.img} alt={tile.title} className={classes.gridImage}/>
                  <GridListTileBar classes={{root: classes.tileBar, title: classes.tileTitle, titleWrap: classes.titleWrap}}
                    title={tile.title}
                    actionIcon={
                      <IconButton href={tile.link}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
  );
}

MsxProductPictureGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MsxProductPictureGrid);
