import { UpColor } from '@loopring-web/common-resources'
import { ChartType, ScaleAreaChart, ToggleButtonGroup, TradeTitle, useSettings } from '@loopring-web/component-lib'
import { Box, Grid } from '@mui/material'
import { WithTranslation } from 'react-i18next'
import { useBasicInfo } from './hook'
import { VolToNumberWithPrecision } from 'utils/formatter_tool'
import { useTokenMap } from 'stores/token'

const BasicInfoPanel = ({props, coinAInfo, coinBInfo, tradeFloat, marketArray, t, ...rest}: any & WithTranslation) => {

    const {
        baseShow,
        quoteShow,
        chartType,
        tgItemJSXs,
        handleChange,
        originData,
    } = useBasicInfo(props, coinAInfo, coinBInfo, marketArray, t)
    const {upColor} = useSettings();
    const {tokenMap:{marketMap}} = useTokenMap()
    const baseToken = coinAInfo?.name
    const quoteToken = coinBInfo?.name
    const marketPrecision = marketMap ? marketMap[`${baseToken}-${quoteToken}`].precisionForPrice : 0

    // myLog('basicInfo baseToken:', baseToken, ' quoteToken:', quoteToken)

    const trendChartData = originData && !!originData.length ? originData.sort((a: any, b: any) => a.timeStamp - b.timeStamp) : []
    const depthChartData = originData && coinAInfo && originData.asksAmtTotals ? {
        ...originData,
        asksAmtTotals: originData.asksAmtTotals.map((amt: string) => Number(VolToNumberWithPrecision(amt, baseToken))),
        bidsAmtTotals: originData.bidsAmtTotals.map((amt: string) => Number(VolToNumberWithPrecision(amt, baseToken))),
    } : []
    return <>
        <Grid item>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <TradeTitle {...{
                    baseShow,
                    quoteShow,
                    coinAInfo, coinBInfo,
                    ...rest, t, tradeFloat
                }}></TradeTitle>
                <ToggleButtonGroup exclusive {...{...rest, t, tgItemJSXs, value: chartType}}
                                   onChange={handleChange} size={'medium'}/>
            </Box>
        </Grid>
        <Box flex={1} alignItems={'stretch'} flexDirection="row" marginTop={3} position={'relative'}>
            <Box flex={1} display={'flex'} flexDirection={'column'} minHeight={396} maxHeight={420}
                 style={{height: '100%', width: '101%'}}>
                <ScaleAreaChart
                    type={chartType}
                    data={chartType === ChartType.Trend ? trendChartData : depthChartData}
                    riseColor={upColor as keyof typeof UpColor}
                    extraInfo={quoteToken}
                    handleMove={() => {
                    }}
                    showXAxis
                    marketPrecision={marketPrecision}
                />
            </Box>

        </Box>

    </>

};

export default BasicInfoPanel
