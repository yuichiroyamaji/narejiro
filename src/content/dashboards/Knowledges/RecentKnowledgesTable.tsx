import { ChangeEvent, useState } from 'react';
import {
  PropTypes, BulkActions, Label, KnowledgeData, KnowledgeDataStatus, KnowledgeDataDefault,
  EditKnowledgeDialog, DeleteKnowledgeDialog, DisplayKnowledgeDialog,
  Tooltip, Divider, Box,FormControl, InputLabel, Card, Checkbox, IconButton,
  Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer,
  Select, MenuItem, Typography, useTheme, CardHeader, EditTwoToneIcon, DeleteTwoToneIcon
} from './index';

const getStatusLabel = (KnowledgeDataStatus: KnowledgeDataStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };
  const { text, color }: any = map[KnowledgeDataStatus];
  return <Label color={color}>{text}</Label>;
};

type Filters = {
  status?: KnowledgeDataStatus;
};

const applyFilters = (
  KnowledgeDatas: KnowledgeData[],
  filters: Filters
): KnowledgeData[] => {
  return KnowledgeDatas.filter((KnowledgeData) => {
    let matches = true;

    if (filters.status && KnowledgeData.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  KnowledgeDatas: KnowledgeData[],
  page: number,
  limit: number
): KnowledgeData[] => {
  return KnowledgeDatas.slice(page * limit, page * limit + limit);
};

interface RecentKnowledgesTableProps {
  className?: string;
  KnowledgeDatas: KnowledgeData[];
}

function RecentKnowledgesTable ({ KnowledgeDatas } : RecentKnowledgesTableProps) {

  const [selectedKnowledgeDatas, setSelectedKnowledgeDatas] = useState<number[]>([]);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [displayOpen, setDisplayOpen] = useState<boolean>(false);
  const [knowledgeId, setknowledgeId] = useState<number>(0);
  const [knowledgeContent, setknowledgeContent] = useState<string>("");
  const [knowledgeDataParam, setKnowledgeDataParam] = useState<KnowledgeData>(KnowledgeDataDefault);
  const selectedBulkActions = selectedKnowledgeDatas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({status: null});

  const filteredKnowledgeDatas = applyFilters(KnowledgeDatas, filters);
  const paginatedKnowledgeDatas = applyPagination(filteredKnowledgeDatas, page, limit);
  const selectedSomeKnowledgeDatas =
    selectedKnowledgeDatas.length > 0 &&
    selectedKnowledgeDatas.length < KnowledgeDatas.length;
  const selectedAllKnowledgeDatas =
    selectedKnowledgeDatas.length === KnowledgeDatas.length;
  const theme = useTheme();
  const statusOptions = [
    {id: 'all',name: 'All'},
    {id: 'completed',name: 'Completed'},
    {id: 'pending',name: 'Pending'},
    {id: 'failed',name: 'Failed'}
  ];

  const handleClickEditOpen = (knowledgeDataParam: KnowledgeData) => {
    setEditOpen(true);
    setKnowledgeDataParam(knowledgeDataParam);
  };

  const handleClickDeleteOpen = (knowledgeId: number) => {
    setDeleteOpen(true);
    setknowledgeId(knowledgeId);
  };

  const handleClickDisplayOpen = (knowledgeContent: string) => {
    setDisplayOpen(true);
    setknowledgeContent(knowledgeContent);
  };

  const handleClose = () => {
    setEditOpen(false);
    setDeleteOpen(false);
    setDisplayOpen(false);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllKnowledgeDatas = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedKnowledgeDatas(
      event.target.checked
        ? KnowledgeDatas.map((KnowledgeData) => KnowledgeData.SK)
        : []
    );
  };

  const handleSelectOneKnowledgeData = (
    event: ChangeEvent<HTMLInputElement>,
    KnowledgeDataId: number
  ): void => {
    if (!selectedKnowledgeDatas.includes(KnowledgeDataId)) {
      setSelectedKnowledgeDatas((prevSelected) => [
        ...prevSelected,
        KnowledgeDataId
      ]);
    } else {
      setSelectedKnowledgeDatas((prevSelected) =>
        prevSelected.filter((id) => id !== KnowledgeDataId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="なれっじ一覧"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllKnowledgeDatas}
                  indeterminate={selectedSomeKnowledgeDatas}
                  onChange={handleSelectAllKnowledgeDatas}
                />
              </TableCell>
              <TableCell>なれっじID</TableCell>
              <TableCell>カテゴリ(大)</TableCell>
              <TableCell>カテゴリ(中)</TableCell>
              <TableCell>カテゴリ(小)</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>投稿日</TableCell>
              <TableCell>更新日</TableCell>
              <TableCell>操作</TableCell>
              {/* <TableCell align="right">actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedKnowledgeDatas.map((KnowledgeData) => {
              const isKnowledgeDataSelected = selectedKnowledgeDatas.includes(
                KnowledgeData.SK
              );
              return (
                <TableRow
                  hover
                  key={KnowledgeData.SK}
                  selected={isKnowledgeDataSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isKnowledgeDataSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneKnowledgeData(event, KnowledgeData.SK)
                      }
                      value={isKnowledgeDataSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {KnowledgeData.SK}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {KnowledgeData.cat1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {KnowledgeData.cat2}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {KnowledgeData.cat3}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      sx={{
                        '&:hover': {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main,
                        textDecoration: 'underline'
                      }}
                      onClick={() => handleClickDisplayOpen(KnowledgeData.content)}
                    >
                      {KnowledgeData.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {KnowledgeData.createdAt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {KnowledgeData.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {KnowledgeData.updatedAt}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {KnowledgeData.updatedBy}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit なれっじ" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleClickEditOpen(KnowledgeData)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete なれっじ" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleClickDeleteOpen(KnowledgeData.SK)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DisplayKnowledgeDialog
        knowledgeContent={knowledgeContent}
        open={displayOpen}
        onClose={handleClose}
      />
      <EditKnowledgeDialog
        open={editOpen}
        onClose={handleClose}
        knowledgeDataParam={knowledgeDataParam}
      />
      <DeleteKnowledgeDialog
        knowledgeId={knowledgeId}
        open={deleteOpen}
        onClose={handleClose}
      />
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredKnowledgeDatas.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentKnowledgesTable.propTypes = {
  KnowledgeDatas: PropTypes.array.isRequired
};

RecentKnowledgesTable.defaultProps = {
  KnowledgeDatas: []
};

export default RecentKnowledgesTable;
