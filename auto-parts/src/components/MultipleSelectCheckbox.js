import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const selectStyle = {
  height: '56px',
};

const MultipleSelectCheckbox = props => {
  const { optionsList = [], selectedOption = '' } = props;

  return (
    <FormControl sx={{ m: 1, width: 223 }}>
      <Select
        sx={selectStyle}
        value={selectedOption}
        onChange={props.handleSelectedOptionChange}
        renderValue={selected => (
          <div>
            <ListItemText primary={selected} />
          </div>
        )}
      >
        {selectedOption && (
          <MenuItem key={'Clear selection'} value={''} style={{ height: 54 }}>
            <ListItemText
              primary={'Clear selection'}
              style={{ marginLeft: 13 }}
            />
          </MenuItem>
        )}
        {optionsList.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOption === option} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectCheckbox;
