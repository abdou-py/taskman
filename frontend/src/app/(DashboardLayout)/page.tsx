'use client'
import { Grid, Box, Card, CardContent, Typography, Stack, useTheme } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { CheckCircle, Assignment, PendingActions } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

// Enhanced TaskStats component
const TaskStats = () => {
  const theme = useTheme();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Assignment fontSize="large" color="primary" />
          <Typography variant="h5">Task Statistics</Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={<Assignment fontSize="large" />}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Completed"
              value={completedTasks}
              icon={<CheckCircle fontSize="large" />}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Pending"
              value={pendingTasks}
              icon={<PendingActions fontSize="large" />}
              color={theme.palette.warning.main}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography variant="body1">
            Completion Progress: {completionPercentage}%
          </Typography>
          <Box 
            height={8} 
            bgcolor={theme.palette.grey[200]} 
            borderRadius={4}
            mt={1}
          >
            <Box
              width={`${completionPercentage}%`}
              height={8}
              bgcolor={theme.palette.primary.main}
              borderRadius={4}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Reusable StatCard component
const StatCard = ({ title, value, icon, color }: any) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box color={color}>{icon}</Box>
    <Box>
      <Typography variant="body1" color="textSecondary">{title}</Typography>
      <Typography variant="h4" fontWeight={600}>{value}</Typography>
    </Box>
  </Stack>
);

// Updated Dashboard with TaskStats integration
const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* Task Statistics at the top */}
          <Grid item xs={12} lg={12}>
            <TaskStats />
          </Grid>

        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;