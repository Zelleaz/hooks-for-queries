import { parse } from "qs"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useQueryField, useQueryFields, useQueryFlatParam, useQueryFlatParams } from "./hooks"
import { chartDefaultValues, flatDefaultValues, tableDefaultValues } from "./hooks/hooks.mock"
import { ChartParams, FlatParams } from "./hooks/hooks.types"

 
export const App = () => {

  const { search } = useLocation()

  useEffect(() => {
    console.log('Current data:', parse(search.slice(1)))
  }, [search])

  const [ orderBy, setOrderBy ] = useQueryField({
    defaultValues: tableDefaultValues,
    key: 'orderBy',
    prefix: 'mui',
    settingName: 'table'
  })

  const [chartData, setChartData] = useQueryFields<ChartParams>({
    defaultValues: chartDefaultValues,
    prefix: 'users',
    settingName: 'charts'
  })

  const [flat, setFlat] = useQueryFlatParam({
    defaultValue: '21',
    key: 'fontSize'
  })

  const [flatData, setFlatData] = useQueryFlatParams<FlatParams>(flatDefaultValues)

  return (
    <div className="container">
      <section>
        <h2>UseQueryField</h2>
        <pre>
          Data: 
          {JSON.stringify(orderBy, null, 2)} 
        </pre>
        <input 
            type="text"
            value={orderBy}
            onChange={e => setOrderBy(e.target.value)} 
            placeholder="Type to set orderBy"
         />
      </section>

      <hr />

      <section>
        <h2>UseQueryFields</h2>

        <pre>
          Data: 
          {JSON.stringify(chartData, null, 2)}
        </pre>

        <button
          onClick={() => {
            setChartData({
              animate: chartData.animate === 'true' ? 'false' : 'true'
            })
          }}
        >Toggle animate</button>
        <button
          onClick={() => {
            setChartData({
              caching: chartData.caching === 'true' ? 'false' : 'true'
            })
          }}
        >Toggle Caching</button>
        <button
          onClick={() => {
            setChartData({
              parseTree: chartData.parseTree === 'true' ? 'false' : 'true'
            })
          }}
        >Toggle ParseTree</button> 
        <button
          onClick={() => {
            setChartData({
              parseTree: chartData.parseTree === 'true' ? 'false' : 'true',
              animate: chartData.animate === 'true' ? 'false' : 'true',
              caching: chartData.caching === 'true' ? 'false' : 'true'
            })
          }}
        >
          Toggle All
        </button>
        <input type="text" value={chartData.name}  
          onChange={e => {
            setChartData({
              name: e.target.value
            })
          }}
        />
        <input type="number" value={chartData.rating}  
          onChange={e => {
            setChartData({
              rating: e.target.value
            })
          }}
        />
      </section>

      <hr />

      <section>
        <h2>UseQueryFlatParam</h2>
        <pre>
          Data: {JSON.stringify(flat, null, 2)}
        </pre>
        <input type="number" value={flat} onChange={e => setFlat(e.target.value)} />
      </section>

      <hr />

      <section>
        <h2>UseQueryFlatParams</h2>
        <pre>
          Data: {JSON.stringify(flatData, null, 2)}
        </pre>

        <input type="number" value={flatData.fontSize} onChange={e => setFlatData({
          fontSize: e.target.value
        })} />

        <input type="text" value={flatData.language} onChange={e => setFlatData({
          language: e.target.value
        })} />

        <input type="text" value={flatData.parced} onChange={e => setFlatData({
          parced: e.target.value
        })} />

      </section>
    </div>
  )
}