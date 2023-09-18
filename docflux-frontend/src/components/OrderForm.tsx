import { VStack, Container, Button, Spinner, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_ORDER_MUTATION, ALL_TEMPLATES_QUERY } from "../graphql-operations";
import { AddOrderInput } from "../generated/graphql-types";
import { API_URL } from "..";

const inputStyle = { margin: 10 };

export default function OrderForm() {
  const [name, setName] = useState<string>("");
  const [company, setComapny] = useState<string | undefined>(undefined);
  const [addressOne, setAddressOne] = useState<string>("");
  const [addressTwo, setAddressTwo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [spinnerOn, setSpinnerOn] = useState<boolean>(false);
  const [downloadReady, setDownloadReady] = useState<boolean>(false);

  const [performer, setPerformer] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [timeOfDelivery, setTimeOfDelivery] = useState<string>("");
  const [timeInfo, setTimeInfo] = useState<string | undefined>(undefined);
  const [delivery, setDelivery] = useState<string>("");
  const [priceEuro, setPriceEuro] = useState<number>(0);
  const [priceInfo, setPriceInfo] = useState<string | undefined>(undefined);
  const [otherOne, setOtherOne] = useState<string | undefined>(undefined);
  const [otherTwo, setOtherTwo] = useState<string | undefined>(undefined);

  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER_MUTATION);

  const allTemplatesQuery = useQuery(ALL_TEMPLATES_QUERY);

  console.log(allTemplatesQuery);

  const sendOrder = async (order: AddOrderInput) => {
    addOrder({ variables: { input: order } });
    /*if (res.status === 200) {
        setSpinnerOn(false);
        setDownloadReady(true);
      } else {
        console.log("asdf");
        setSpinnerOn(false);
        setDownloadReady(false);
      }*/
  };

  const fetchPdfAndDownload = async () => {
    const res: Response = await fetch(API_URL + "/download-pdf", {
      method: "GET",
    });
    const blob = await res.blob();
    var file = window.URL.createObjectURL(blob);
    window.open(file, "_blank");
  };

  return (
    <VStack spacing={8}>
      <Container>
        <Select style={inputStyle} placeholder="Select template">
          {!allTemplatesQuery.loading &&
            allTemplatesQuery.data.allTemplates.map((t: any) => (
              <option key={t.id} value={t.uuid}>
                {t.title}
              </option>
            ))}
        </Select>
        <Input
          style={inputStyle}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Company (optional)"
          onChange={(e) => setComapny(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Address Row 1"
          onChange={(e) => setAddressOne(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Address Row 2"
          onChange={(e) => setAddressTwo(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Container>
      <Container>
        <Input
          style={inputStyle}
          placeholder="Performer"
          onChange={(e) => setPerformer(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Time of Delivery"
          type={"date"}
          onChange={(e) =>
            setTimeOfDelivery(new Date(e.target.value).toISOString())
          }
        />
        <Input
          style={inputStyle}
          placeholder="Time Info (optional)"
          onChange={(e) => setTimeInfo(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Delivery"
          onChange={(e) => setDelivery(e.target.value)}
        />
        <Input
          style={inputStyle}
          type="number"
          placeholder="Price (€)"
          onChange={(e) => setPriceEuro(Number(e.target.value))}
        />
        <Input
          style={inputStyle}
          placeholder="Price Info (optional)"
          onChange={(e) => setPriceInfo(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Other row one (optional)"
          onChange={(e) => setOtherOne(e.target.value)}
        />
        <Input
          style={inputStyle}
          placeholder="Other row two (optional)"
          onChange={(e) => setOtherTwo(e.target.value)}
        />
        <Button
          style={inputStyle}
          onClick={() =>
            sendOrder({
              orderInfo: {
                performer: performer,
                location: location,
                timeOfDelivery: timeOfDelivery,
                timeInfo: timeInfo,
                delivery: delivery,
                priceEuro: priceEuro,
                priceInfo: priceInfo,
                otherOne: otherOne,
                otherTwo: otherTwo,
              },
              customerInfo: {
                name: name,
                company: company,
                addressOne: addressOne,
                addressTwo: addressTwo,
                email: email,
              },
            })
          }
        >
          {spinnerOn ? <Spinner /> : "Submit"}
        </Button>
        <Button
          isDisabled={!downloadReady}
          onClick={() => fetchPdfAndDownload()}
        >
          Download
        </Button>
      </Container>
    </VStack>
  );
}
