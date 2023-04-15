import { useState, useEffect, useCallback } from "react";
import { ThirdwebNftMedia, useContract, useContractMetadata, useNFTs } from "@thirdweb-dev/react";
import "./styles/Home.css";
import styles from "./styles/nftGallery.module.css";
import Web3 from 'web3';

const LOCATION_MAP = {
  1: "Dubai in Miami",
  2: "Dubai",
  3: "Miami",
  4: "Miami in Dubai"
}


export default function Home() {
  const [location, setLocation] = useState(2)
  const [metadata, setMetadata] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingLocChange, setLoadingLocChange] = useState(true)

  // const { contract } = useContract('0xFC3166405Dd04a22632016c312e763818e5d595B');
  // const { data: nft, isLoading } = useNFTs(contract, 1);


  const fetchNft = useCallback(() => {
    const provider = new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/Fe6TKBkUSn2qsq4NIpsDw9zbC6OCXAq3');
    const web3 = new Web3(provider);
    const contractAddress = '0xFC3166405Dd04a22632016c312e763818e5d595B'
    const abi = [
      {
        "inputs": [{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    const contract = new web3.eth.Contract(abi, contractAddress);
    const processData = async (uri) => {
      var response = await fetch(uri, { headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }});
      let jsonMedatada = await response.json();
      setLoading(false)
      setLoadingLocChange(false)
      setMetadata(jsonMedatada);
    }
    contract.methods.tokenURI(location).call((error, result) => {
      if (error) {
        console.error(error);
      } else {
        processData(result);
      }
      });
  }, [location])

  useEffect(() => {
    fetchNft(location)
  }, [fetchNft, location])

  const handleLocationChange = (e) => {
    setLoadingLocChange(true)
    setLocation(e.target.value)
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to AI Outfitters!
        </h1>

        <p className="description">
          Dress your NFT PFP according to your location!
        </p>

        <div>
        {!loading ?
          (<div className={styles.card_container}>

              {!loadingLocChange ?
                <img className={styles.image} src={metadata.image} alt=""></img>
                : (<div className={styles.image_loading}>Loading...</div>)
              }
              {/* <ThirdwebNftMedia metadata={nft.metadata} /> */}

              <div className={styles.info_container}>
                <div style={{paddingTop: 4}}>Location</div>
                <div className={styles.location_select_wrapper}>
                  <select className={styles.location_select} value={location} onChange={handleLocationChange}>
                    {Object.keys(LOCATION_MAP).map((key) => <option key={key} value={key}>{LOCATION_MAP[key]}</option>)}
                  </select>
                </div>
              </div>

          </div>)
          : (<p className="loading">Loading...</p>) }
        </div>

      </main>
    </div>
  );
}
