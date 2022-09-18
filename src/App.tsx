import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Fruit from "./components/Fruit";
import Environment from "./components/Environment";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Fruit />
      <Environment />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
