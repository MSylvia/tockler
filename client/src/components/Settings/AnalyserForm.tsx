import * as React from 'react';
import { Card, Button, Icon, Tooltip } from 'antd';
import { SettingsService } from '../../services/SettingsService';
import { AnalyserFormItem } from './AnalyserFormItem';

import { Flex, Box } from 'grid-styled';

const defaultAnalyserSettings = [
    { findRe: '\\w+-\\d+.*JIRA', takeTitle: '', takeGroup: '\\w+-\\d+', enabled: true },
    { findRe: '9GAG', takeTitle: '', takeGroup: '9GAG', enabled: true },
];

const emptyItem = { findRe: '', takeTitle: '', takeGroup: '', enabled: false };

export const AnalyserForm = ({ appTrackItems }) => {
    const [analyserItems, setAnalyserItems] = React.useState<any>([]);

    React.useEffect(() => {
        async function fetchSettings() {
            const items = await SettingsService.fetchAnalyserSettings();
            setAnalyserItems(items || []);
        }

        fetchSettings();
    }, []);

    const removeItem = index => () => {
        analyserItems.splice(index, 1);
        setAnalyserItems([...analyserItems]);
        SettingsService.saveAnalyserSettings([...analyserItems]);
    };
    const saveItem = index => data => {
        analyserItems[index] = data;
        setAnalyserItems([...analyserItems]);
        SettingsService.saveAnalyserSettings([...analyserItems]);
    };

    const addItem = () => {
        setAnalyserItems([...analyserItems, emptyItem]);
    };

    const setDefaults = () => {
        setAnalyserItems([...analyserItems, ...defaultAnalyserSettings]);
    };

    return (
        <Card
            title="Analyser settings"
            extra={
                <Tooltip placement="left" title="Notify if title equals these analyser items.">
                    <Icon type="info-circle" style={{ fontSize: 20, color: 'primary' }} />
                </Tooltip>
            }
        >
            {analyserItems.map((item, index) => (
                <AnalyserFormItem
                    key={index}
                    appTrackItems={appTrackItems}
                    removeItem={removeItem(index)}
                    saveItem={saveItem(index)}
                    analyserItem={item}
                />
            ))}
            <Flex p={1} justifyContent="flex-end">
                <Button type="primary" shape="circle" icon="plus" onClick={addItem} />
            </Flex>

            <Flex p={1} justifyContent="flex-start">
                <Button onClick={setDefaults}>Add sample values</Button>
            </Flex>
        </Card>
    );
};
