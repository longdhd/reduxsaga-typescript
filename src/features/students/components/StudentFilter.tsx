import { Search } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { City, ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface StudentFilterProps {
    filter: ListParams,
    cityList: City[],
    onChange?: (newFilter: ListParams) => void,
    onSearchChange?: (newFilter: ListParams) => void
}

export default function StudentFilter({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilter = {
            ...filter,
            name_like: e.target.value,
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Search by name</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            endAdornment={<Search />}
                            onChange={handleSearchChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
}
