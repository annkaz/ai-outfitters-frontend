import { useState } from "react";
import { ThirdwebNftMedia, useContract, useContractMetadata, useNFTs} from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import styles from "./styles/nftGallery.module.css";

export default function Home() {
  const [location, setLocation] = useState('miami')
  const { contract } = useContract('0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D');
  const { data: nfts, isLoading } = useNFTs(contract);
  // const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to AI Outfitters!
        </h1>

        <p className="description">
          Dress your NFT PFP according to your location!
        </p>

        {/* <div>
          {!loadingMetadata &&
          <header className="heading">
            <div>
              <img src={metadata?.image} alt="NFT Collection Thumbnail" />
              <h1>{metadata?.name}</h1>
            </div>
          </header>
          }
        </div> */}

        <div>
        {!isLoading ?
          (<div className={styles.card_container}>
            {/* {nfts?.map(e =>
              <div className="card">
                <ThirdwebNftMedia metadata={e.metadata} />
              </div>
            )} */}

              <ThirdwebNftMedia metadata={nfts[0].metadata} />
              <div className={styles.info_container}>
                <div>Title</div>
              </div>
              {/* <div className={styles.info_container}>
                <div>Location</div>
                <div>
                  <select className={styles.location_select} value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="dubai">Dubai</option>
                    <option value="miami">Miami</option>
                  </select>
                </div>
              </div> */}
              <Dropdown value={location} handleChange={(e) => setLocation(e.target.value)} />

          </div>)
          : (<p className="loading">Loading...</p>) }
        </div>

        {/* <div className="connect">
          <ConnectWallet />
        </div> */}

      </main>
    </div>
  );
}

const Dropdown = ({location, handleChange}) => {
  return (
    <div className={styles.info_container}>
      <div>Location</div>
      <div>
        <select className={styles.location_select} value={location} onChange={handleChange}>
          <option value="dubai">Dubai</option>
          <option value="miami">Miami</option>
        </select>
      </div>
    </div>
  )
}
