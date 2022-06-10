import { c } from 'ttag';

import { NotificationModel } from '@proton/shared/lib/interfaces/calendar/Notification';
import {
    NOTIFICATION_INPUT_ID,
    NOTIFICATION_UNITS_MAX,
    SETTINGS_NOTIFICATION_TYPE,
} from '@proton/shared/lib/calendar/constants';
import {
    getDaysBefore,
    getHoursBefore,
    getMinutesBefore,
    getSameDay,
    getSameTime,
    getWeeksBefore,
} from './notificationOptions';
import { classnames } from '../../../../helpers';
import { Option, SelectTwo, IntegerInput, TimeInput, Spotlight, useSpotlightShow } from '../../../../components';
import { FeatureCode } from '../../..';
import { useSpotlightOnFeature } from '../../../..';

const { EMAIL, DEVICE /* BOTH */ } = SETTINGS_NOTIFICATION_TYPE;

interface Props {
    className?: string;
    notification: NotificationModel;
    hasWhen?: boolean;
    hasType?: boolean;
    onChange: (model: NotificationModel) => void;
    error?: string;
    isNarrow: boolean;
}

const getWhenOptions = (isAllDay: boolean, value = 0) => {
    if (isAllDay) {
        return [getSameDay(), getDaysBefore(value), getWeeksBefore(value)];
    }

    return [getSameTime(), getMinutesBefore(value), getHoursBefore(value), getDaysBefore(value), getWeeksBefore(value)];
};

const NotificationInput = ({
    className,
    notification,
    notification: { isAllDay, type, when, value, at, unit },
    hasType = false,
    onChange,
    error,
    isNarrow,
}: Props) => {
    const safeValue = value === undefined ? 1 : value;

    const options = getWhenOptions(isAllDay, safeValue);
    const textOptions = options.map((option, i) => ({ text: option.text, value: i }));
    const closestOption = options.findIndex((option) => {
        return option.value === safeValue && option.unit === unit && option.when === when;
    });
    const optionsValue = closestOption === -1 ? 0 : closestOption;

    const hasValueInput = value === undefined || value > 0;

    const errorProps = typeof error === 'string' ? { 'aria-invalid': true } : {};

    const {
        show,
        onDisplayed,
        onClose: onCloseSpotlight,
    } = useSpotlightOnFeature(FeatureCode.SpotlightEmailNotifications, !isNarrow);
    const shouldShowSpotlight = useSpotlightShow(show);

    return (
        <div className={classnames(['flex flex-nowrap flex-item-fluid on-mobile-flex-column', className])}>
            {hasType && (
                <Spotlight
                    show={shouldShowSpotlight}
                    onDisplayed={onDisplayed}
                    type="new"
                    content={
                        <>
                            <div className="text-lg text-bold mb0-25">{c('Spotlight')
                                .t`No more missed appointments`}</div>
                            <p className="m0">
                                {c('Spotlight')
                                    .t`With email notifications, you decide which events to be notified about and when.`}
                            </p>
                        </>
                    }
                >
                    <span
                        className={classnames([
                            'flex flex-nowrap on-mobile-mt0-5 on-mobile-mb0-5 mr0-5',
                            isAllDay && at ? 'on-tiny-mobile-ml0' : 'w10e on-mobile-ml0',
                        ])}
                    >
                        <SelectTwo
                            value={type}
                            onChange={({ value }) => onChange({ ...notification, type: +value })}
                            title={c('Title').t`Select the way to send this notification`}
                            onOpen={onCloseSpotlight}
                            {...errorProps}
                        >
                            {[
                                { text: c('Notification type').t`notification`, value: DEVICE },
                                { text: c('Notification type').t`email`, value: EMAIL },
                                // { text: c('Notification type').t`both notification and email`, value: BOTH },
                            ].map(({ value, text }) => (
                                <Option key={value} value={value} title={text} />
                            ))}
                        </SelectTwo>
                    </span>
                </Spotlight>
            )}
            <span className="flex flex-nowrap flex-item-fluid">
                {hasValueInput && (
                    <span className="flex-item-noshrink mr0-5 w6e">
                        <IntegerInput
                            id={NOTIFICATION_INPUT_ID}
                            data-test-id="notification-time-input"
                            step={1}
                            min={0}
                            max={NOTIFICATION_UNITS_MAX[unit]}
                            value={value}
                            onChange={(newValue) => {
                                if (newValue !== undefined && newValue === 0) {
                                    return;
                                }
                                onChange({ ...notification, value: newValue });
                            }}
                            onBlur={() => {
                                if (!value) {
                                    onChange({ ...notification, value: 1 });
                                }
                            }}
                            title={c('Title (number of minutes/hours/days/weeks)').t`Choose a number`}
                            {...errorProps}
                        />
                    </span>
                )}
                <SelectTwo
                    data-test-id="notification-time-dropdown"
                    className="flex-item-fluid"
                    value={optionsValue}
                    onChange={({ value }) => {
                        const optionIndex = +value;
                        const option = options[optionIndex];
                        if (!option) {
                            return;
                        }
                        onChange({
                            ...notification,
                            ...option,
                        });
                    }}
                    title={c('Title').t`Select when you want this notification to be sent`}
                    {...errorProps}
                >
                    {textOptions.map(({ value, text }) => (
                        <Option key={value} value={value} title={text} />
                    ))}
                </SelectTwo>
            </span>
            {isAllDay && at && (
                <span className="flex on-tiny-mobile-flex-column flex-nowrap">
                    {isAllDay && at && (
                        <span className="flex flex-nowrap flex-item-fluid flex-align-items-center on-mobile-mt0-5">
                            <span className="flex-item-noshrink ml0-5 on-mobile-ml0 mr0-5">{c('Notification time input')
                                .t`at`}</span>
                            <span className="w8e">
                                <TimeInput
                                    data-test-id="notification-time-at"
                                    value={at}
                                    onChange={(at) => onChange({ ...notification, at })}
                                    title={c('Title').t`Select the time to send this notification`}
                                    {...errorProps}
                                />
                            </span>
                        </span>
                    )}
                </span>
            )}
        </div>
    );
};

export default NotificationInput;
