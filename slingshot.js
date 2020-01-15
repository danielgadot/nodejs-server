 class Slingshot {

    constructor({ date, Time, Open, High, Low, Close, ratio, tradeNumber }) {
        this.date = date;
        this.hour = Time;
        this.open = Open;
        this.high = High;
        this.low = Low;
        this.close = Close;
        this.range = parseFloat((this.high - this.low).toFixed(4));
        this.tradeNumber = tradeNumber;
        this.tpHigh = parseFloat((this.high + (this.range * ratio)).toFixed(4));
        this.tpLow = parseFloat((this.low - (this.range * ratio)).toFixed(4));
    }

    calculateCount(patternCandleB, candlesAfterPattern){
        let currentPosition = '';
        let count = 0;
        let lows = [];
        let highs = [];
        // console.log('patternCandleB  ', patternCandleB)
        let patternCandle = {
            date: patternCandleB.date,
            high: patternCandleB.high,
            low: patternCandleB.low,
            tpLow: patternCandleB.tpLow,
            tpHigh: patternCandleB.tpHigh,
            range: patternCandleB.range,
            reachedTp : false,
            count: 0,
            currentPosition: '',
            retrace: 0,
            retracePrice: 0
        }
        let isIncreased = false;
        candlesAfterPattern.forEach((candle, j) => {
                if (!patternCandle.reachedTp) {
                    if (candle.high > patternCandle.tpHigh || candle.low < patternCandle.tpLow) {
                        patternCandle.reachedTp = true;
                    }
                    if (patternCandle.high < candle.high && currentPosition !== 'long position') {
                        count++;
                        currentPosition = 'long position';
                    }
                    if (patternCandle.low > candle.low && currentPosition !== 'short position') {
                        count++;
                        currentPosition = 'short position';
                    }
                    // push to lows and highs after trade #4 for retrace calculation
                    if (count === this.tradeNumber ) {
                        if (currentPosition === 'long position') {
                            lows.push(candle.low);
                            if (!isIncreased) {
                                // console.log(' before :: ', patternCandle)

                                isIncreased = true;
                                //test for increase tp
                                // patternCandle.tpHigh = patternCandle.tpHigh + (patternCandle.range /2);
                                // console.log(' after :: ', patternCandle)

                            }
                        } else if (currentPosition === 'short position') {
                            highs.push(candle.high);
                            if (!isIncreased) {
                                //test for increase tp
                                // patternCandle.tpLow = patternCandle.tpLow - (patternCandle.range /2);
                                isIncreased = true;
                            }
                        }
                    }
                }
            });
            patternCandle.currentPosition = currentPosition;
            patternCandle.count = count;
        if (count === this.tradeNumber ) {
            if (currentPosition === 'long position') {

                //remove first candle (of breakout)
                lows.shift();
                // get the lowest
                patternCandle.retracePrice = Math.min(...lows);
                //calculate retrace percentage
                patternCandle.retrace = ((patternCandle.high - patternCandle.retracePrice) / patternCandle.range);
            } else if (currentPosition === 'short position') {

                //remove first candle (of breakout)
                highs.shift();
                // get the highest
                patternCandle.retracePrice = Math.max(...highs);
                // calculate retrace percentage
                patternCandle.retrace = ((patternCandle.retracePrice - patternCandle.low) / patternCandle.range);
            }
            // if its 0
            if (!isFinite(patternCandle.retrace)) {patternCandle.retrace = 0}
        }
        return patternCandle
    }

    checkIfIb(yesterdayCandle, todayCandle) {
        return yesterdayCandle.high > todayCandle.high && yesterdayCandle.low < todayCandle.low;
    }
}


module.exports = Slingshot;