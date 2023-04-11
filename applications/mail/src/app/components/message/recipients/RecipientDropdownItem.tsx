import { MouseEvent } from 'react';

import { c } from 'ttag';

import { ContactImage, Copy, ProtonBadgeType, useNotifications } from '@proton/components';
import { getInitials } from '@proton/shared/lib/helpers/string';
import { Recipient } from '@proton/shared/lib/interfaces';

interface Props {
    label: string;
    recipient: Recipient;
    bimiSelector?: string;
    closeDropdown: () => void;
    displaySenderImage: boolean;
    isOutside?: boolean;
}

const RecipientDropdownItem = ({
    displaySenderImage,
    bimiSelector,
    label,
    recipient,
    closeDropdown,
    isOutside,
}: Props) => {
    const { createNotification } = useNotifications();

    // Label value can contain :
    //  - Contact Name if the recipient is a contact, or Recipient Name or Recipient Address on PM
    //  - Recipient Name or Recipient Address on EO
    // Recipient might not have a Name or a Contact Name, and by default we put the Address
    // In this case, we don't want to display the Address field twice
    const hasName = label !== '' && label !== recipient.Address;

    const handleCopyEmail = () => {
        createNotification({
            type: 'success',
            text: c('Success').t`Email address copied to clipboard`,
        });

        closeDropdown();
    };

    // Prevent closing dropdown if click inside the recipient info
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="flex flex-nowrap flex-align-items-center opacity-on-hover-container p0-5" onClick={handleClick}>
            <span className="item-icon flex flex-item-noshrink rounded mx-2" aria-hidden="true">
                <span className="mauto">
                    {isOutside ? (
                        <>{getInitials(label)}</>
                    ) : (
                        <ContactImage
                            email={recipient.Address}
                            name={label}
                            className="rounded"
                            bimiSelector={bimiSelector}
                            displaySenderImage={displaySenderImage}
                        />
                    )}
                </span>
            </span>
            <div className="flex flex-column flex-item-fluid px0-5" data-testid="recipient:dropdown-item--contact-name">
                <span className="text-ellipsis user-select" title={label}>
                    {label}
                    {!isOutside && recipient && <ProtonBadgeType recipient={recipient} />}
                </span>
                {hasName && <span className="color-weak text-ellipsis user-select">{`<${recipient.Address}>`}</span>}
            </div>
            <Copy
                value={recipient.Address}
                className="opacity-on-hover mr-2 flex-item-noshrink"
                onCopy={handleCopyEmail}
                tooltipText={c('Action').t`Copy email to clipboard`}
                size="small"
                data-test-id="recipient:dropdown-item--copy-address-button"
            />
        </div>
    );
};

export default RecipientDropdownItem;
