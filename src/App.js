import './App.css';
import React, { useEffect, useState } from 'react'
// import Header from './components/Header'
// import Body from './components/Body'
import Select from "react-select"
// import data from './profile/template'
import data from './profile/test2'
import TextareaAutosize from "react-autosize-textarea"
import ImageRender from './components/ImageRender'

function App() {
  //////////////////////////////////////// Header ///////////////////////////////////////////////////////////////////////
  let subCat2 = ""
  let spec2 = ""
  let img = ""
  const [imgNM, setImgNM] = useState(null)
  const [cat, setCat] = useState(null)
  const [subCat, setSubCat] = useState(null)
  const [subCatList, setSubCatList] = useState([])
  const [spec, setSpec] = useState(null)
  const [specList, setSpecList] = useState([])

  // handle change event of the C1 dropdown
  const handleCatChange = (obj) => {
    setCat(obj);
    setSubCatList(obj.subcat);
    setSubCat(null);
  };
 
  // handle change event of the C2 dropdown
  const HandleSubCatChange = (obj) => {
    setSubCat(obj);
    subCat2 = obj;
    setSpecList(obj.spec)
    setSpec(null);
    // Update Table 
    setPattern({
      ...pattern,
      name: subCat2.name,
      size: subCat2.size,
      yarn: subCat2.yarn,
      needles: subCat2.needles,
      gauge: subCat2.gauge,
      cm10Sts: subCat2.sts,
      cm10Rows: subCat2.rows,
      cm1Sts: subCat2.sts/10,
      cm1Rows: subCat2.rows/10
    })
  }

  const HandleSpecChange = (obj) => {
    // console.log("spec:\n", spec)
    setSpec(obj)
    spec2 = obj
    img = spec2.image
    console.log(img);
    setImgNM(img)
  }

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#999999"

    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 150,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const selectStyles2 = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "10pt"
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      fontSize: "10pt"
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// Body ///////////////////////////////////////////////////////////////////////
  let pre = ''
  let toggle = ''
  const [stsCm, setStsCM] = useState(0)
  const [btn1, setBtn1] = useState('active-color')
  const [btn2, setBtn2] = useState('toggle-button')
  const [pattern, setPattern] = useState(
    {
      name: "No Title",
      yarn: "",
      needles: "",
      gauge: 0,
      cm10Sts: 0,
      cm10Rows: 0,
      cm1Sts: 0,
      cm1Rows: 0,
      stsCm: 0,
    }
  )

  function keyChange(e){
    // console.log(e.target);
    const value = e.target.value;
    if(e.target.name === 'cm10Sts'){
      setPattern({
        ...pattern,
        [e.target.name]: value,
        cm1Sts: value/10,
      })
    } else if(e.target.name === 'cm10Rows'){
      setPattern({
        ...pattern,
        [e.target.name]: value,
        cm1Rows: value/10,
      })
    } else {
      setPattern({
        ...pattern,
        [e.target.name]: value
      })
    }
  }

  // Set max line and lenth to "YARN" field
  function textAreaChange(e){
    if(e.target.value.split("\n").length>3){
        e.target.value=pre;
        return;
    };
    pre=e.target.value;
    setPattern({
      ...pattern,
      [e.target.name]: e.target.value
    })
  }

  function toggleClicked(e){
    console.log(e.target);
    if(e.target.id === '0'){
      toggle = 0;
      setBtn1('active-color')
      setBtn2('toggle-button')
      console.log('btn1: ', btn1);
    }else {
      toggle = 1;
      setBtn1('toggle-button')
      setBtn2('active-color')
    }
    console.log(toggle);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <div className='header'>
        <div className='cat'>
          <div>
            <Select
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
              styles={selectStyles}
              className='dropDown'
              placeholder="Select"
              value={cat}
              options={data}
              onChange={handleCatChange}
              getOptionLabel={x => x.cat}
              getOptionValue={x => x.cat}
            />
          </div>
          <div className='separator'>▶︎</div>
          <div>
            <Select
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
              styles={selectStyles}
              className='dropDown'
              placeholder="Select"
              value={subCat}
              options={subCatList}
              onChange={HandleSubCatChange}
              getOptionLabel={x => x.name}
              getOptionValue={x => x.name}
            />
          </div>
        </div>
      </div>

      <div className='wrapper'>
        <div className='container-sm'>
          <div className='row'>
            <div className='col'>
              <div className='title-bar'>
                {/* <input type="text"className='title-text' placeholder={props.subcat === null ? "NoName" : props.subcat.name} /> */}
                <input type="text"className='title-text' name='name' value={pattern.name} onChange={keyChange}/>
                <span className='title-copy-right'>@BOKNIT_</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div id='col-content' className='col'>
              <div id='content1' className='content-area'>
                <div className='container-xs'>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>SIZE :</span></div>
                    <div className='col-sm'>
                      {/* <input type="text" contentEditable="false" className='pattern-input' placeholder={subCat === null ? 0 : subCat.size}/>
                      <input type="text"className='pattern-input' name='size' value={pattern.size} onChange={keyChange}/> */}
                      <Select
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        styles={selectStyles2}
                        className="dropDown-size"
                        placeholder="Select"
                        value={spec}
                        options={specList}
                        onChange={HandleSpecChange}
                        getOptionLabel={x => x.size}
                        getOptionValue={x => x.size}
                      />
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>YARN :</span></div>
                    <div className='col-sm'>
                      {/* <TextareaAutosize id='text-autosize-1' placeholder={subCat === null ? 'Knitting for Olive' : subCat.yarn} className='text-autosize' maxLength={100} maxRows={3} onChange={textAreaChange}/> */}
                      <TextareaAutosize id='text-autosize-1' name='yarn' value={pattern.yarn} className='text-autosize' maxLength={100} maxRows={3} onChange={textAreaChange}/>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>NEEDLES:</span></div>
                    <div className='col-sm'>
                      {/* <input type="text" className='pattern-input' placeholder={subCat === null ? 0 : subCat.needles}/> */}
                      <input type="text" className='pattern-input' name='needles' value={pattern.needles} onChange={keyChange}/>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>GAUGE :</span></div>
                    <div className='col-sm'>
                      {/* <input type="text" className='pattern-input' placeholder={subCat === null ? 0 : subCat.gauge}/> */}
                      <input type="text" className='pattern-input' name='gauge' value={pattern.gauge} onChange={keyChange}/>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label-sm'><span className='label-text'>10cm :</span></div>
                    <div className='col-sm'>
                      {/* <input type="text" className='pattern-input-sm' name='sts' placeholder={subCat === null ? 0 : subCat.sts} onChange={keyChange}/> */}
                      <input type="text" className='pattern-input-sm' name='cm10Sts' value={pattern.cm10Sts} onChange={keyChange}/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>sts,</span></div>
                    <div className='col-sm'>
                      {/* <input type="text" className='pattern-input-sm' name='rows' placeholder={subCat === null ? 0 : subCat.rows} onChange={keyChange}/> */}
                      <input type="text" className='pattern-input-sm' name='cm10Rows' value={pattern.cm10Rows} onChange={keyChange}/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>rows</span></div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label-sm'><span className='label-text'>1cm :</span></div>
                    <div className='col-sm'>
                      {/* <span className='pattern-input-sm'>{subCat === null ? cm1Sts : subCat.sts/10}</span> */}
                      <input type="text" className='pattern-input-sm' value={pattern.cm1Sts} onChange={keyChange}/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>sts,</span></div>
                    <div className='col-sm'>
                      {/* <span className='pattern-input-sm'>{subCat === null ? 0 : subCat.rows/10}</span> */}
                      <input type="text" className='pattern-input-sm' value={pattern.cm1Rows} onChange={keyChange}/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>rows</span></div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label-sm'><span className='label-text'>1sts :</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input-sm' value={stsCm} onChange={keyChange}/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>cm</span></div>
                    <div className='pattern-label-sm'><span className='label-text'></span></div>
                  </div>
                </div>
              </div>
            </div>
            <div id='col-content' className='col'>
              <div id='content2' className='content-area'>
                <div className='container-xs'>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>SIZE:</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input'/>
                      <div className='stroke-1'></div>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>YARN:</span></div>
                    <div className='col-sm'>
                      <TextareaAutosize id='text-autosize-2' placeholder='Knitting for Olive' className='text-autosize' maxLength={100} maxRows={3} onChange={textAreaChange}/>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>NEEDLES:</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input'/>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label'><span className='label-text'>GAUGE:</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input'/>
                    </div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label-sm'><span className='label-text'>10CM:</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input-sm'/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>sts,</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input-sm'/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>rows</span></div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label-sm'><span className='label-text'>1CM:</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input-sm'/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>sts,</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input-sm'/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>rows</span></div>
                  </div>
                  <div id='row2' className='row'>
                    <div className='pattern-label-sm'><span className='label-text'>1sts :</span></div>
                    <div className='col-sm'>
                      <input type="text" className='pattern-input-sm'/>
                    </div>
                    <div className='pattern-label-sm'><span className='label-text'>cm</span></div>
                    <div className='pattern-label-sm'><span className='label-text'></span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='row3' className='row'>
            <div className='col'>
              <button name='btn1' id='0' className={btn1} onClick={toggleClicked}>
                PATTERN GAUGE
              </button>
            </div>
            <div className='col'>
              <button name='btn2' id='1' className={btn2} onClick={toggleClicked}>
                MY GAUGE
              </button>
            </div>
          </div>
        </div>
        
        <div className='container-sm'>
          <div id='bottom-row' className='row'>
              <div id='bottom-col' className='col'>
                  <div className='image-area'>
                  {
                    imgNM != null
                    ? <img className='img' src={require(`./img/${imgNM}.png`)} alt=''/>
                    : <span>No Image!</span>
                  }
                  </div>

                  <div className='spec-area'>
                    {
                      spec != null
                      ? <div>
                        <span className='spec-num' style={{
                          // marginLeft: `${spec.position[0].x}`,
                          // marginTop: `${spec.position[0].y}`
                          marginLeft: "520px",
                          marginTop: "-1480px"
                        }}>
                          {/* {spec.position[0].value} */}
                          1000
                        </span>
                        <span className='spec-num' style={{
                          // marginLeft: `${spec.position[1].x}`,
                          // marginTop: `${spec.position[1].y}`
                          marginLeft: "80px",
                          marginTop: "-1230px",
                        }}>
                          {/* {spec.position[1].value} */}
                          1000
                        </span>
                        </div>
                      : <div><span></span></div>
                    }
                  </div>

              </div>
          </div>
        </div>

      </div>

      <div className='footer'>
        <span className='copy-right'>@BOKNIT_</span>
      </div>
    </div>
  );
}

export default App;
