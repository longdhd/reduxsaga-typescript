import { Search } from '@mui/icons-material';
import { Box, Button, Grid, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { City, ListParams } from 'models';
import { ChangeEvent, ReactNode, useRef } from 'react';

export interface StudentFilterProps {
    filter: ListParams,
    cityList: City[],
    onChange?: (newFilter: ListParams) => void,
    onSearchChange?: (newFilter: ListParams) => void
}

export default function StudentFilter({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {
    const searchRef = useRef<HTMLInputElement>();
    const cityFilterRef = useRef<HTMLSelectElement>();
    const sortRef = useRef<HTMLSelectElement>();

    if (cityFilterRef) {
        console.log(cityFilterRef.current?.value);
    }
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1
        }

        onSearchChange(newFilter);
    };

    const handleFilterChange = (e: SelectChangeEvent<{ name?: string, value: unknown }>, child: ReactNode) => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            city: e.target.value || undefined,
            _page: 1
        }

        onChange(newFilter);
    }

    const handleSortChange = (e: SelectChangeEvent<any>, child: ReactNode) => {
        if (!onChange) return;

        const value = e.target.value;
        const [sort, order] = value.split('.');

        const newFilter: ListParams = {
            ...filter,
            page: 1,
            _sort: sort || undefined,
            _order: order || undefined
        }

        onChange(newFilter);
    }

    const handleClearFilter = () => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            name_like: undefined,
            city: undefined,
            _order: undefined,
            _sort: undefined
        }

        onChange(newFilter);

        if (searchRef.current && cityFilterRef.current && sortRef.current) {
            searchRef.current.value = '';
            cityFilterRef.current.value = '';
            sortRef.current.value = '';
        }
    }

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
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant='outlined' size="medium" fullWidth>
                        <InputLabel id="filterByCity">Filter by city</InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.code}
                            label="Filter by city"
                            onChange={handleFilterChange}
                            ref={cityFilterRef}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>

                            {cityList.map(city =>
                                <MenuItem value={city.code} key={city.code}>{city.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant='outlined' size="medium" fullWidth>
                        <InputLabel id="sortBy">Sort by</InputLabel>
                        <Select
                            labelId="sortBy"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            label="Sort by"
                            onChange={handleSortChange}
                            ref={sortRef}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant="outlined" onClick={handleClearFilter} fullWidth>Clear filter</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
