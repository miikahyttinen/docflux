import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

const API_URL = "http://localhost:8000";

const inputStyle = { margin: 10 };

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Tabs>
            <TabList>
              <Tab>Orders</Tab>
              <Tab>New Order</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OrderList />
              </TabPanel>
              <TabPanel>
                <OrderForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
