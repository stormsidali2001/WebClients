import { useState } from 'react';

import {
    ModalTwo,
    ModalTwoHeader,
    ModalTwoTitle,
    ModalTwoContent,
    ModalTwoFooter,
    Button,
    AlertModal,
    Icon,
    RadioGroup,
} from '@proton/components';

import { getTitle } from '../../helpers/title';

import mdx from './Modal.mdx';

export default {
    component: ModalTwo,
    subcomponents: { ModalTwoHeader, AlertModal },
    title: getTitle(__filename, false),
    parameters: {
        docs: {
            page: mdx,
        },
    },
};

export const Primary = () => {
    const sizes = ['small', 'medium', 'large', 'full'];
    const [size, setSize] = useState<null | string>('medium');
    const [open, setOpen] = useState(false);

    return (
        <div className="text-center">
            <Button
                className="mr0-5"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open size modal
            </Button>
            <ModalTwo
                small={size === 'small'}
                large={size === 'large'}
                full={size === 'full'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <ModalTwoHeader />
                <ModalTwoContent>
                    <ModalTwoTitle>Size</ModalTwoTitle>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis rem
                        accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
                        qui vero, blanditiis quos?
                    </p>

                    <div className="mr2">
                        <strong className="block mb1">Shape</strong>
                        <RadioGroup
                            name="selected-shape"
                            onChange={setSize}
                            value={size}
                            options={sizes.map((size) => ({ value: size, label: size }))}
                        />
                    </div>
                </ModalTwoContent>
                <ModalTwoFooter>
                    <Button>Secondary action</Button>
                    <Button color="norm">Primary action</Button>
                </ModalTwoFooter>
            </ModalTwo>
        </div>
    );
};

export const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-center">
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open modal with header extras
            </Button>
            <ModalTwo open={open} onClose={() => setOpen(false)}>
                <ModalTwoHeader
                    title="Title in ModalHeader"
                    subline="Subline in ModalHeader"
                    onBack={() => window.alert('ModalHeader.onBack fired')}
                />
                <ModalTwoContent>
                    <ModalTwoTitle>Title h3 in content</ModalTwoTitle>
                    <p className="m0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis rem
                        accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
                        qui vero, blanditiis quos?
                    </p>
                </ModalTwoContent>
                <ModalTwoFooter>
                    <Button>Secondary action</Button>
                    <Button color="norm">Primary action</Button>
                </ModalTwoFooter>
            </ModalTwo>
        </div>
    );
};

export const HeaderActions = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-center">
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open actions modal
            </Button>
            <ModalTwo open={open} onClose={() => setOpen(false)}>
                <ModalTwoHeader
                    actions={
                        <>
                            <Button>
                                <Icon name="circle-question" />
                            </Button>
                            <Button>
                                <Icon name="arrows-rotate" />
                            </Button>
                        </>
                    }
                />
                <ModalTwoContent>
                    <ModalTwoTitle>Title h3 in content</ModalTwoTitle>
                    <p className="m0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis rem
                        accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
                        qui vero, blanditiis quos?
                    </p>
                </ModalTwoContent>
                <ModalTwoFooter>
                    <Button>Secondary action</Button>
                    <Button color="norm">Primary action</Button>
                </ModalTwoFooter>
            </ModalTwo>
        </div>
    );
};

export const ALotOfContent = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-center">
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open modal with a lot of content
            </Button>
            <ModalTwo open={open} onClose={() => setOpen(false)}>
                <ModalTwoHeader />
                <ModalTwoContent>
                    <ModalTwoTitle>Title h3 in content</ModalTwoTitle>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptatum deserunt rem amet
                        consectetur perspiciatis placeat error doloribus vero voluptate quisquam numquam expedita, ex
                        maxime quas, nemo labore necessitatibus accusamus.
                    </p>
                    <p>
                        Delectus blanditiis corporis et est exercitationem odio itaque vero! Fugiat sit eius minus!
                        Architecto quibusdam nisi ullam impedit vel repellat amet, molestias, beatae repudiandae quis
                        fugit, qui ea assumenda maxime.
                    </p>
                    <p>
                        Deserunt rerum aspernatur sint placeat natus nisi quas, facere nesciunt quos obcaecati at
                        suscipit hic modi incidunt numquam necessitatibus labore? Maxime nisi repellendus enim cum
                        nostrum. Officiis porro fuga asperiores?
                    </p>
                    <p>
                        Voluptates minus soluta, ullam maxime labore vitae saepe porro mollitia beatae perferendis velit
                        quasi quidem. Similique numquam repellendus nulla adipisci dolore tempore tenetur laudantium.
                        Sed debitis eos odit beatae soluta?
                    </p>
                    <p>
                        Deleniti, dicta velit. Magnam optio rerum esse est nisi neque unde quos, natus quam aperiam
                        dignissimos porro harum, maxime sed laudantium voluptas cum nam officiis molestiae. Quas iure
                        dicta consectetur.
                    </p>
                    <p>
                        Dolorum ducimus iste asperiores quibusdam laudantium soluta, doloremque minus incidunt
                        distinctio quod dolorem. Nulla nam vitae rerum impedit iste, accusantium veritatis aut, hic
                        animi optio blanditiis, repellat fugit dicta maxime!
                    </p>
                    <p>
                        Quaerat sequi, quis doloribus vel asperiores unde nam excepturi facere consequuntur delectus
                        officia dolorem et itaque sunt iste, suscipit maiores fugiat minus cum! Et id nostrum, officiis
                        facilis voluptas fugiat.
                    </p>
                    <p>
                        Ratione praesentium atque, eveniet nulla expedita distinctio assumenda odit suscipit non
                        architecto accusamus quaerat quod fuga omnis veniam error reprehenderit. At aut impedit
                        excepturi tenetur nulla molestias possimus totam vitae.
                    </p>
                    <p>
                        Molestiae, delectus quae itaque illum impedit eligendi. Molestiae cumque, nam repellat modi
                        dolorum quisquam sequi voluptates velit repudiandae numquam vel quis. Excepturi adipisci hic
                        velit veritatis tenetur, aliquid quod maiores?
                    </p>
                    <p>
                        Pariatur, sint nostrum accusamus dolorum eveniet esse totam praesentium nemo ipsum mollitia quod
                        ad nisi beatae. Veniam, rem illum ratione alias dolores eos sit officia necessitatibus tempora,
                        earum adipisci iure!
                    </p>
                </ModalTwoContent>
                <ModalTwoFooter>
                    <Button>Secondary action</Button>
                    <Button color="norm">Primary action</Button>
                </ModalTwoFooter>
            </ModalTwo>
        </div>
    );
};

export const FullscreenOnMobile = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-center">
            <Button
                className="mr0-5"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open full screen on mobile modal
            </Button>
            <ModalTwo fullscreenOnMobile open={open} onClose={() => setOpen(false)}>
                <ModalTwoHeader />
                <ModalTwoContent>
                    <ModalTwoTitle>I&apos;m full screen on mobile</ModalTwoTitle>
                    <p>
                        If I&apos;m not full screen you&apos;ll have to make your screen&apos;s width smaller. If you
                        did that and I&apos;m still not fullscreen that means my developers did a shlopey job.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis rem
                        accusamus obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet
                        qui vero, blanditiis quos?
                    </p>
                </ModalTwoContent>
                <ModalTwoFooter>
                    <Button>Secondary action</Button>
                    <Button color="norm">Primary action</Button>
                </ModalTwoFooter>
            </ModalTwo>
        </div>
    );
};

export const Alert = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-center">
            <Button onClick={() => setOpen(true)}>Open Alert Modal</Button>
            <AlertModal
                title="Title"
                subline="Subline"
                open={open}
                onClose={() => setOpen(false)}
                buttons={
                    <>
                        <Button className="mb0-5" color="danger">
                            Continue
                        </Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>,
                    </>
                }
            >
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium unde, blanditiis rem accusamus
                    obcaecati enim amet, voluptatibus nemo facilis illum aut itaque in? Deleniti iure amet qui vero,
                    blanditiis quos?
                </p>
            </AlertModal>
        </div>
    );
};
