import * as React from 'react';
import { DatePicker, Button, Icon } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
import { Flex, Box } from 'grid-styled';

interface IProps {
    timerange: any;
    loadTimerange: (timerange: any) => void;
    changeVisibleTimerange: (timerange: any) => void;
}

interface IHocProps {}

type IFullProps = IProps & IHocProps;

const getDayBefore = d => moment(d).subtract(1, 'days');
const getDayAfter = d => moment(d).add(1, 'days');

export class Search extends React.PureComponent<IFullProps, IProps> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (dates: any) => {
        console.log('TIMERANGE:', dates, this.props);
        if (dates != null) {
            const beginDate = dates[0];
            const endDate = dates[1];
            const newTimerange = [beginDate, endDate];
            this.props.loadTimerange(newTimerange);
        } else {
            console.error('No dates selected');
        }
    };

    selectToday = () => {
        const beginDate = moment().startOf('day');
        const endDate = moment().endOf('day');
        this.props.loadTimerange([beginDate, endDate]);
    };

    selectYesterday = () => {
        const beginDate = getDayBefore(moment().startOf('day'));
        const endDate = getDayBefore(moment().endOf('day'));
        this.props.loadTimerange([beginDate, endDate]);
    };

    goBackOneDay = () => {
        const { timerange } = this.props;
        const beginDate = getDayBefore(moment(timerange[0]));
        const endDate = getDayBefore(moment(timerange[1]));
        this.props.loadTimerange([beginDate, endDate]);
    };

    goForwardOneDay = () => {
        const { timerange } = this.props;
        const beginDate = getDayAfter(moment(timerange[0]));
        const endDate = getDayAfter(moment(timerange[1]));
        this.props.loadTimerange([beginDate, endDate]);
    };

    showDay = () => {
        const { timerange } = this.props;
        const beginDate = moment(timerange[0]).startOf('day');
        const endDate = moment(timerange[0]).endOf('day');
        this.props.changeVisibleTimerange([beginDate, endDate]);
    };

    showHour = () => {
        const { timerange } = this.props;
        const beginDate = moment(timerange[0]).startOf('hour');
        const endDate = moment(timerange[0]).endOf('hour');
        this.props.changeVisibleTimerange([beginDate, endDate]);
    };

    showAM = () => {
        const { timerange } = this.props;
        const beginDate = moment(timerange[0]).startOf('day');
        const endDate = moment(timerange[0])
            .startOf('day')
            .hour(12);
        this.props.changeVisibleTimerange([beginDate, endDate]);
    };

    showPM = () => {
        const { timerange } = this.props;
        const beginDate = moment(timerange[0])
            .startOf('day')
            .hour(12);
        const endDate = moment(timerange[0]).endOf('day');
        this.props.changeVisibleTimerange([beginDate, endDate]);
    };
    showEvening = () => {
        const { timerange } = this.props;
        const beginDate = moment(timerange[0])
            .startOf('day')
            .hour(17);
        const endDate = moment(timerange[0]).endOf('day');
        this.props.changeVisibleTimerange([beginDate, endDate]);
    };

    render() {
        const { timerange } = this.props;

        console.log('Have timerange in Search:', timerange);
        return (
            <Flex>
                <Box p={1}>
                    <Button onClick={this.selectYesterday}>Yesterday</Button>
                </Box>
                <Box p={1}>
                    <Button onClick={this.goBackOneDay}>
                        <Icon type="left" />
                    </Button>
                </Box>
                <Box p={1}>
                    <RangePicker value={timerange} onChange={this.onChange} />
                </Box>
                <Box p={1}>
                    <Button onClick={this.goForwardOneDay}>
                        <Icon type="right" />
                    </Button>
                </Box>
                <Box p={1}>
                    <Button onClick={this.selectToday}>Today</Button>
                </Box>
                <Box flex={1} />
                <Box p={1}>
                    <Button onClick={this.showDay} type="dashed">
                        All Day
                    </Button>
                </Box>
                <Box p={1}>
                    <Button onClick={this.showAM} type="dashed">
                        AM
                    </Button>
                </Box>
                <Box p={1}>
                    <Button onClick={this.showPM} type="dashed">
                        PM
                    </Button>
                </Box>
                <Box p={1}>
                    <Button onClick={this.showEvening} type="dashed">
                        Evening
                    </Button>
                </Box>
                <Box p={1}>
                    <Button onClick={this.showHour} type="dashed">
                        Hour
                    </Button>
                </Box>
            </Flex>
        );
    }
}
