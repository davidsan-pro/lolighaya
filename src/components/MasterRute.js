import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import DisplayListMasterRute from "./DisplayListMasterRute";
import { useLocation } from "react-router-dom";
// import AccordionItem from "react-bootstrap/esm/AccordionItem";
// import { ListGroup, Accordion } from "react-bootstrap";

const MasterRute = () => {
  const [rute, setRute] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    getRute();
  }, []);

  const getRute = async (query='') => {
    setIsLoading(true);
    let myurl = `${global.config.base_url}/mrute`;
    if (query) {
      myurl += location.search ? '?' : '&';
      myurl += `q=${query}`;
    }
    const response = await fetch(myurl);
    const data = await response.json();
    console.log('data', data);
    setRute(data);
    setIsLoading(false);
  };

  const deleteRute = async (id, string) => {
    if ( ! window.confirm(`Data Rute [${string}] akan dihapus. Lanjutkan?`)) {
      return false;
    }

    const myurl = `${global.config.base_url}/mrute/${id}`;
    await fetch(myurl, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    getRute();
  };


  return (
    <div>
      <SearchBar onSearch={getRute} keywordType="nama toko"/>
      <div className="mb-3">
        <strong className="is-size-4 me-3">Data Rute</strong>
        <Link to="/add_rute" className="button is-primary">
          Tambah Baru
        </Link>
      </div>
      {isLoading ? <Spinner animation="border" /> : <DisplayListMasterRute rute={rute} onDelete={deleteRute} />}
      {/* {console.log('asd1', rute)} */}
      {/* {isLoading ? <Spinner animation="border" /> : <DisplayListBarang barang={barang} onDelete={deleteBarang} />} */}
      {/* 
      <Accordion>
        {
          rute.map((item, index) => {
            if (index == 0 || rute[index].nama_rute != rute[index-1].nama_rute) {
              return (
                <Accordion.Item key={item.id} eventKey={item.id}>
                  <Accordion.Header>
                    <label className="fw-bold">Rute {item.nama_rute}</label>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="mb-2">
                      <Button className="fs-6">Edit</Button>
                    </div>
                    {ruteHari.map((subitem) => {
                      if (item.nama_rute == subitem.nama_rute) {
                        return (
                          <ListGroup.Item>
                            <div className="fs-5">
                              <label>hari ke {subitem.hari}</label>
                            </div>
                          </ListGroup.Item>
                        )
                      }
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              )
            }
            // end if (index == 0 || rute[index].nama_rute != rute[index-1].nama_rute) 
          })
        }
      </Accordion> 
      */}
    </div>
  );
};

export default MasterRute;
